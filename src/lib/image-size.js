import fs from 'fs';

// Only the file header is needed to read intrinsic dimensions, so we never
// pull a multi-megabyte screenshot into memory. JPEG SOF markers can sit after
// a large EXIF block, hence the generous window.
const HEADER_BYTES = 256 * 1024;

function readHeader(filePath) {
  let fd;
  try {
    fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(HEADER_BYTES);
    const bytesRead = fs.readSync(fd, buffer, 0, HEADER_BYTES, 0);
    return buffer.subarray(0, bytesRead);
  } catch {
    return null;
  } finally {
    if (fd !== undefined) fs.closeSync(fd);
  }
}

function pngSize(buf) {
  // 8-byte signature, then the IHDR chunk: length(4) type(4) width(4) height(4).
  if (buf.length < 24) return null;
  if (buf.toString('ascii', 12, 16) !== 'IHDR') return null;
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

function gifSize(buf) {
  if (buf.length < 10) return null;
  return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
}

function jpegSize(buf) {
  let offset = 2;
  while (offset + 9 < buf.length) {
    if (buf[offset] !== 0xff) {
      offset++;
      continue;
    }
    const marker = buf[offset + 1];
    // SOF0-3, SOF5-7, SOF9-11, SOF13-15 carry the frame dimensions. The gaps
    // (C4/C8/CC) are DHT/JPG/DAC segments and must be skipped, not parsed.
    const isSOF =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc;
    if (isSOF) {
      return {
        height: buf.readUInt16BE(offset + 5),
        width: buf.readUInt16BE(offset + 7),
      };
    }
    if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd9)) {
      offset += 2;
      continue;
    }
    const segmentLength = buf.readUInt16BE(offset + 2);
    if (segmentLength < 2) return null;
    offset += 2 + segmentLength;
  }
  return null;
}

function webpSize(buf) {
  if (buf.length < 30) return null;
  if (buf.toString('ascii', 8, 12) !== 'WEBP') return null;
  const chunk = buf.toString('ascii', 12, 16);
  if (chunk === 'VP8 ') {
    return {
      width: buf.readUInt16LE(26) & 0x3fff,
      height: buf.readUInt16LE(28) & 0x3fff,
    };
  }
  if (chunk === 'VP8L') {
    const bits = buf.readUInt32LE(21);
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (chunk === 'VP8X') {
    const width = 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16));
    const height = 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16));
    return { width, height };
  }
  return null;
}

/**
 * Intrinsic pixel dimensions of a local raster image, or null if the file is
 * missing, truncated, or in a format we do not parse (e.g. SVG).
 */
export function getImageSize(filePath) {
  const buf = readHeader(filePath);
  if (!buf || buf.length < 12) return null;

  let size = null;
  if (buf.toString('hex', 0, 8) === '89504e470d0a1a0a') size = pngSize(buf);
  else if (buf.toString('ascii', 0, 3) === 'GIF') size = gifSize(buf);
  else if (buf[0] === 0xff && buf[1] === 0xd8) size = jpegSize(buf);
  else if (buf.toString('ascii', 0, 4) === 'RIFF') size = webpSize(buf);

  if (!size || !size.width || !size.height) return null;
  return size;
}

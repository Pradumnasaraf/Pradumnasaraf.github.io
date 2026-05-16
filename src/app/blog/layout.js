// Wrapper exists only on /blog routes - dark-mode CSS rules require this
// element as an ancestor, so the theme cannot apply outside the blog.
export default function BlogLayout({ children }) {
  return <div className="blog-theme-root">{children}</div>;
}

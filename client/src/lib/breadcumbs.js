const HIDDEN_SEGMENTS = ["about"];

export function generateBreadcrumbs(pathname) {
  const parts = pathname.split("/").filter(Boolean);

  const breadcrumbs = [];
  let currentPath = "";

  parts.forEach((part) => {
    if (HIDDEN_SEGMENTS.includes(part)) {
      currentPath += `/${part}`; 
      return;
    }

    currentPath += `/${part}`;

    breadcrumbs.push({
      label: part.replace(/-/g, " "),
      path: currentPath,
    });
  });

  return breadcrumbs;
}

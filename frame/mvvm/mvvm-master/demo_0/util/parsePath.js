const BAIL_RE = /[^\w.$]/;

function parsePath(path) {
  const segments = path.split(".");
  return obj => {
    segments.forEach(elem => {
      elem = elem.replace(/\s*/g, "");
      if (!obj) return;
      obj = obj[elem];
    });
    return obj;
  };
}

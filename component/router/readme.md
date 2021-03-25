# 前端路由

## hash

```html
<a href="#/home">首页</a>
<a href="#/about">关于</a>
<div id="html"></div>

<script>
  window.addEventListener("load", () => {
    html.innerHTML = location.hash.slice(1);
  });
  window.addEventListener("hashchange", () => {
    html.innerHTML = location.hash.slice(1);
  });
</script>
```

## history

```html
<a onclick="go('/home')">首页</a>
<a onclick="go('/about')">关于</a>
<div id="html"></div>

<script>
  function go(pathname) {
    history.pushState({}, null, pathname);
    html.innerHTML = pathname;
  }
  window.addEventListener("popstate", () => {
    go(location.pathname);
  });
</script>
```

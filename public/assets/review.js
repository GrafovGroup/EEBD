document.querySelectorAll('.desktop-frame,.mobile-frame').forEach(frame=>{
  const desktop=frame.classList.contains('desktop-frame');
  const width=desktop?1280:390, height=desktop?850:844;
  const iframe=frame.querySelector('iframe');
  iframe.style.width=`${width}px`;
  iframe.style.height=`${height}px`;
  const resize=()=>{
    const scale=(frame.clientWidth)/width;
    iframe.style.transform=`scale(${scale})`;
    frame.style.height=`${height*scale+2}px`;
  };
  new ResizeObserver(resize).observe(frame);
  resize();
});

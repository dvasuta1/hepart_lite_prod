javascript:(function()%7B(function()%20%7Bwhile%20(div%20%3D%20document.getElementById('hepart_lite_js'))%20%7Bdiv.parentNode.removeChild(div)%3B%7Dwhile%20(div%20%3D%20document.getElementById('hepart_lite_css'))%20%7Bdiv.parentNode.removeChild(div)%3B%7Dvar%20u%20%3D%20'https%3A%2F%2Fcdn.rawgit.com%2Fdvasuta1%2Fhepart_lite_prod%2Fmaster%2Fhepart_lite.js'%3Bvar%20s%20%3D%20document.createElement('script')%3Bs.id%20%3D%20'hepart_lite_js'%3Bs.type%20%3D%20'text%2Fjavascript'%3Bs.charset%20%3D%20'utf-8'%3Bs.src%20%3D%20u%20%2B%20'%3F'%20%2B%20new%20Date().getTime()%3Bdocument.body.appendChild(s)%3Bvar%20head%20%3D%20document.getElementsByTagName('head')%5B0%5D%3Bvar%20link%20%3D%20document.createElement('link')%3Blink.rel%20%3D%20'stylesheet'%3Blink.type%20%3D%20'text%2Fcss'%3Blink.href%20%3D%20'https%3A%2F%2Fcdn.rawgit.com%2Fdvasuta1%2Fhepart_lite_prod%2Fmaster%2Fbookmarklet.css'%3Blink.media%20%3D%20'all'%3Blink.id%20%3D%20%22hepart_lite_css%22%3Bhead.appendChild(link)%3B%7D)()%7D)()

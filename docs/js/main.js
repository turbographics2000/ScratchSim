window.addEventListener('drag', evt => evt.preventDefault());
window.addEventListener('dragover', evt => evt.preventDefault());
window.addEventListener('drop', evt => {
    evt.preventDefault();
    if(evt.dataTransfer.files.length) {
        const loader = new sb2Loader('btnGreenFlag', 'btnStop');
        loader.load(evt.dataTransfer.files[0])
            .then(_ => {
                const div = document.createElement('div');
                const pre = document.createElement('pre');
                const code = document.createElement('code');
                code.innerHTML = loader.jsCode;
                div.appendChild(pre);
                pre.appendChild(code);
                document.body.appendChild(div);
                
                hljs.configure({
                    tabReplace: '    ', // 4 spaces
                });
                hljs.highlightBlock(code);
            })
            .catch(_ => console.log('load scratch project error.'));
    }
});
function message ({type = 'error', title, time = 2000}) {
    let errBox = document.createElement('div')
    switch (type) {
        case 'error':
            errBox.className = 'message-box err-box';
            break;
        case 'info':
            errBox.className = 'message-box info-box';
            break;
        case 'success':
            errBox.className = 'message-box success-box';
            break;  
            case undefined:
                errBox.className = 'message-box err-box';
                break; 
        default:
            break;
    }

    let appDiv = document.querySelector('#app')
    appDiv.appendChild(errBox)
    errBox.innerHTML = title
    setTimeout(() => {
        errBox.style.top = `${-50}px`
        setTimeout(() => {
            appDiv.removeChild(errBox)
        },1000)
    }, time)
}

function modal ({title, content, okText='确定', cancelText='取消', ok, cancel}) {
    let appDiv = document.querySelector('#app')

    let modalBox = document.createElement('div')
    modalBox.className = 'modal-box'
    let shadeBox = document.createElement('div')
    shadeBox.className = 'modal-shade'
    appDiv.appendChild(modalBox)
    appDiv.appendChild(shadeBox)
    let titleBox = document.createElement('h2')
    let contentBox = document.createElement('p')
    modalBox.appendChild(titleBox)
    modalBox.appendChild(contentBox)
    titleBox.innerHTML = title
    contentBox.innerHTML = content

    let btnBox = document.createElement('div')
    modalBox.appendChild(btnBox)

    let btn1 = document.createElement('button')
    btn1.className = 'cancel btn'
    btn1.innerHTML = cancelText
    btnBox.appendChild(btn1)

    let btn2 = document.createElement('button')
    btn2.className = 'ok btn'
    btn2.innerHTML = okText
    btnBox.appendChild(btn2)
    btn1.addEventListener('click', function(){
        appDiv.removeChild(modalBox)
        appDiv.removeChild(shadeBox)
        cancel()
    })
    btn2.addEventListener('click', function(){
        appDiv.removeChild(modalBox)
        appDiv.removeChild(shadeBox)
        ok()
    })


    
}

export {
    message,
    modal
}
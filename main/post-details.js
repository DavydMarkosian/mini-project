
let url = new URL(location.href)
let idPost = url.searchParams.get('posts')
let id = url.searchParams.get('id')

let wrap = document.createElement('div')
wrap.classList.add('wrap')
document.body.appendChild(wrap)

async function post() {

    await fetch(` https://jsonplaceholder.typicode.com/users/${id}/posts`)
        .then(res => res.json())
        .then(value => {
            for (const post of value) {
                if (post.id == idPost) {
                    let div = document.createElement('div')
                    let titleH3 = document.createElement('h3')
                    let bodyP = document.createElement('p')
                    let idP = document.createElement('p')
                    let userIdP = document.createElement('p')

                    wrap.appendChild(div)
                    div.append(titleH3, bodyP, idP, userIdP)

                    titleH3.innerText = `${post.title}`
                    bodyP.innerText = `${post.body}`
                    idP.innerText = `Id: ${post.id}`
                    userIdP.innerText = `UserId: ${post.userId}`

                    div.classList.add('post')
                }
            }
        })

    fetch(`https://jsonplaceholder.typicode.com/posts/${idPost}/comments`)
        .then(res => res.json())
        .then((value => {

            let divAllComments = document.createElement('div')
            wrap.appendChild(divAllComments)
            divAllComments.classList.add('wrapComments')

            for (const comment of value) {
                console.log(comment)

                let div = document.createElement('div')
                let idH6 = document.createElement('h6')
                let nameH5 = document.createElement('h5')
                let bodyP = document.createElement('p')

                div.append(idH6, nameH5, bodyP)
                divAllComments.appendChild(div)

                idH6.innerText = `${comment.id}`
                nameH5.innerText = `${comment.name}`
                bodyP.innerText = `${comment.body}`

                div.classList.add('comment')
            }
        }))
}
post()





































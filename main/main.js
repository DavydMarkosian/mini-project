
fetch('http://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(value => {

        let divWrap = document.createElement('div')
        document.body.appendChild(divWrap)
        divWrap.classList.add('wrap')

        for (const user of value) {

            let divUser = document.createElement('div')
            let h4 = document.createElement('h4')
            let btn = document.createElement('button')

            divWrap.appendChild(divUser)
            divUser.append(h4,btn)

            divUser.classList.add('userBlock')
            btn.classList.add('btn')

            h4.innerText = `${user.name} Id: ${user.id}`
            btn.innerText = `Show more`

            btn.addEventListener('click',()=>{
                location.href=`user-details.html?id=${user.id}`
            })
        }

    })
























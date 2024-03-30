
let url = new URL(location.href)
let id = url.searchParams.get('id');

fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(response => response.json())
    .then(value => {
        let div = document.createElement('div')
        document.body.appendChild(div)
        div.classList.add('wrap')

        let h3Name = document.createElement('h3')
        let h3UserName = document.createElement('h3')
        let pId = document.createElement('p')
        let pEmail = document.createElement('p')
        let pPhone = document.createElement('p')
        let pWebsite = document.createElement('p')
        let ulAd = document.createElement('ul')
        let ulCom = document.createElement('ul')

        h3Name.innerText = `name:  ${value.name}`
        h3UserName.innerText = `username: ${value.username}`
        pId.innerText = `id: ${value.id}`
        pEmail.innerText = `email:  ${value.email}`
        pPhone.innerText = `phone: ${value.phone}`
        pWebsite.innerText = `website: ${value.website}`
        ulAd.innerText = `Address:`
        ulCom.innerText = `Company:`

        let address = value.address
        let {city, street, suite, zipcode, geo} = address
        let arrAd = [{city}, {street}, {suite}, {zipcode}, {geo}]

        for (const arrElement of arrAd) {
            let li = document.createElement('li')
            li.innerText = `${Object.keys(arrElement)}: ${Object.values(arrElement)}`
            ulAd.appendChild(li)

            if (Object.keys(arrElement) == 'geo') {
                let {lat, lng} = geo
                let arrGeo = [{lat}, {lng}]

                let ulInner = document.createElement('ul')
                ulAd.appendChild(ulInner)

                for (const arrGeoElement of arrGeo) {
                    li.innerText = 'geo:'

                    let liInner = document.createElement('li')
                    ulInner.appendChild(liInner)

                    liInner.innerText = `${Object.keys(arrGeoElement)}: ${Object.values(arrGeoElement)} `

                }

            }

        }

        div.append(h3Name, h3UserName, pId, pEmail, pPhone, pWebsite, ulAd)

        let company = value.company
        let {bs, catchPhrase, name} = company
        let arr = [{bs}, {catchPhrase}, {name}]

        for (const arrElement of arr) {
            div.appendChild(ulCom)

            let li = document.createElement('li')
            li.innerText = `${Object.keys(arrElement)}: ${Object.values(arrElement)}`
            ulCom.appendChild(li)
        }

        let btn = document.createElement('button')
        div.appendChild(btn)
        btn.classList.add('btn')
        btn.innerText = `Posts of  ${value.name}`

        let postsWrap = document.createElement('div')
        div.appendChild(postsWrap)
        postsWrap.classList.add('clear')

        btn.addEventListener('click', showPosts)

        function showPosts() {
            postsWrap.innerText = ''

            fetch(`https://jsonplaceholder.typicode.com/users/${id}/posts`)
                .then(res => res.json())
                .then(value => {
                    console.log(value)

                    for (const post of value) {
                        let divTitlePost = document.createElement('div')
                        let btnPost = document.createElement('button')
                        let title = document.createElement('p')

                        postsWrap.appendChild(divTitlePost)
                        divTitlePost.append(title, btnPost)

                        postsWrap.classList.add('postsWrap')
                        divTitlePost.classList.add('post')
                        btnPost.classList.add('btnPost')

                        title.innerText = `${post.title}`
                        btnPost.innerText = 'Show post'
                        btnPost.addEventListener('click',goToPostPage)

                        function goToPostPage(){
                            location.href=`post-details.html?id=${id}&&posts=${post.id}`
                        }

                    }

                })
            postsWrap.classList.toggle('clear')
            let clearClass = document.querySelector(`.clear`)
            clearClass? btn.innerText = `Posts of  ${value.name}` : btn.innerText = `Hide posts`

        }
    })



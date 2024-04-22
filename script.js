const submit = document.querySelector('#search')
const usernameInput = document.querySelector('#name')
const error = document.querySelector('.error')
const username = document.querySelector('.username')
const githubName = document.querySelector('.name')
const image = document.querySelector('#image')
const followers = document.querySelector('#followers')
const following = document.querySelector('#following')
const card = document.querySelector('.card')

submit.addEventListener('click', (e) => {
    e.preventDefault()
    let name = usernameInput.value.trim()
    let val = checkusername(name)

    if (val === null) {
        error.innerHTML = ""
        fetchData(name)
    } else {
        error.innerHTML = val
        card.style.opacity = 0;
        card.style.scale = 0;
    }
})

function checkusername(name) {
    if (!name || name === null || name === "" || name.includes(" ")) {
        return "Invalid username"
    } else {
        return null
    }
}

async function fetchData(name) {
    try {
        const response = await fetch(`https://api.github.com/users/${name}`)
        const result = await response.json()
        githubName.innerHTML = result.name
        username.innerHTML = `@${result.login}`
        image.setAttribute('src', `${result.avatar_url}`)
        followers.innerHTML = result.followers
        following.innerHTML = result.following
    } catch (error) {
        error.innerHTML = error
    }

    card.style.opacity = 1;
    card.style.scale = 1;
}
const form = document.getElementById('form');
const input = document.getElementById('input');
const main = document.getElementById('main');
    
const url = 'https://api.github.com/users/';

async function getUserUrl (userUrl) {
       try{
        const {data} = await axios(url + userUrl);
        createUserCard(data);
        getRepos(userUrl);
        // console.log(data);
       }
       catch(err){
           if(err.response.status == 404){
               createErrorCard('No profile With This User Name');

           }
       }
}
async function getRepos (userUrl) {
    try {
        const {data} = await axios(url + userUrl +'/repos?sort=created');
        userRepos(data);

    } catch (error) {
        console.log('Nothing is search');
        createErrorCard('Problem Fetching Repo');
    }
}
function createUserCard(user) {
    const userId = user.name ||user.login;
    const userBio = user.bio?`<p> ${user.bio}</p>`:'';
    const cardHtml = 
    `<div class="card">
            <div>
                    <img src="${user.avatar_url}" alt="${user.name}" class= "avatar" />
            </div>
            <div class="user-info">
                <h2>
                ${userId}
            
                </h2>
                ${userBio}
                <ul>
                <li>${user.followers} <strong>followers</strong></li>
                <li>${user.following}<strong>following</strong></li>
                <li>${user.public_repos}<strong>public repos</strong></li>
                </ul>
                <div id = "repos" ></div>
            </div>
           
    </div>
    `
    main.innerHTML= cardHtml;
}
function createErrorCard(msg) {
    const cardHtml= `
    <div class="card">
    <h1>${msg}</h1>
    </div>
    
    `
    main.innerHTML= cardHtml;
}

function userRepos(repos) {
const userRepos = document.getElementById("repos");
repos
.slice(0,10)
.forEach(repo => {
    const repoitioryItem = document.createElement('a');
    repoitioryItem.classList.add('repo');
    repoitioryItem.href = repo.html_url;
    repoitioryItem.target = '_blank'
    repoitioryItem.innerText =repo.name;
    userRepos.appendChild(repoitioryItem);

});
    
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const value = input.value;
    if (value) {
        getUserUrl(value);
        console.log('Hi there')
        input.value=""
    }
})

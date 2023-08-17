function getAvatar() {
    fetch("https://api.github.com/users/whynotkimhari")
        .then(response => response.json())
        .then((d) => {
            document.querySelector('.image').innerHTML = `<img src="${d.avatar_url}" alt="Kim Hai photo" class="profile-image">`;
        })
}

getRepo();

function getRepo() {
    fetch("https://api.github.com/users/whynotkimhari/repos")
        .then(response => response.json())
        .then((array) => {
            console.log(array)
            var checkArray = ['whynotkimhari.github.io', 'cs50', 'NEET-CODE-150', 'whynotkimhari', 'cryptography'];
            array = array.filter((element) => {
                if (checkArray.indexOf(element.name) === -1) return element.name;
            }).map((element) => {
                return obj = {
                    name: element.name,
                    description: element.description,
                    homepage: element.homepage,
                    topics: element.topics,
                    svn_url: element.svn_url,
                    language: element.language
                }
            }).map((element) => {
                const colorMapping = {
                    CSS: '#563d7c',
                    JavaScript: '#f1e05a',
                    Python: '#3572A5',
                    'C++': '#f34b7d',
                    HTML: '#e34c26',
                };
                var topics = '';

                if (element.topics.length > 0) {
                    topics = `
                        <div class="topic-sec">
                    `

                    element.topics.forEach((topicEl) => {
                        topics += `<div class="topic">${topicEl}</div>`
                    })

                    topics += '</div>';
                }

                return `
                <div class="content">
                    <h2><a href="${element.svn_url}">${element.name}</a></h2>
                    <p>${element.description}</p>
                    <a href=${element.homepage}>&rarr; checkout the page right now!</a>
                    `
                    +
                    topics
                    +
                    `<div class="language-sec">
                        <span class="repo-language-color" style="background-color: ${colorMapping[element.language]}"></span>
                        <span>${element.language}</span>
                    </div>
                    <div class="hr"></div>
                </div>`;
            });
            console.log(array);

            const rightEl = document.querySelector('.right-cont');
            rightEl.innerHTML = array.join('');
        })
}
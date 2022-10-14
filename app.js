const onContentLoaded = async () => {
    const username = "AkashsRepositories"
    const response = await fetch(`https://api.github.com/users/${username}`);
    if(response.status === 404) {
        console.log('user not found')
        return;
    }
    const details = await response.json();
    console.log(await details);
}
document.addEventListener('DOMContentLoaded', onContentLoaded);

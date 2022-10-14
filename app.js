const displayUserDetails = async (userDetails)  => {
    const detailsContainer = document.querySelector("main > .user-details");

    const avatar = detailsContainer.querySelector('.user-avatar');
    if(userDetails.avatar_url){
        avatar.setAttribute('src', userDetails.avatar_url);
    }

    const name = detailsContainer.querySelector('.name');
    name.textContent = userDetails.name?? "Not Available";
    
    const date = detailsContainer.querySelector('.joining-date');
    let creationDate = userDetails.created_at;
    date.textContent = "Joined " +  (creationDate? creationDate.split('T')[0]: "--:--:--");

    const username = detailsContainer.querySelector('.username');
    username.textContent = "@" + userDetails.login?? " ";

    const bioContainer = detailsContainer.querySelector('.user-bio');
    bioContainer.textContent = userDetails.bio?? "This profile has no bio";

    const repoCount = detailsContainer.querySelector('.repos-count');
    repoCount.textContent = userDetails.public_repos?? '--';

    const followerCount = detailsContainer.querySelector('.follower-count');
    followerCount.textContent = userDetails.followers?? '--';

    const followingCount = detailsContainer.querySelector('.following-count');
    followingCount.textContent = userDetails.following?? '--';

    const location = detailsContainer.querySelector('.user-location > span');
    location.textContent = userDetails.location?? 'Not Available';

    const twitter = detailsContainer.querySelector('.twitter-handle > span');
    twitter.textContent = userDetails.twitter_username?? 'Not Available';

    const company = detailsContainer.querySelector('.company > span');
    company.textContent = userDetails.company?? 'Not Available';
} 

//that's where we do api call for user details
const loadUserData = async (username) => {
    const inputBox = document.querySelector('.search-container > input.search-box');
    // username = username?? inputBox.value;   
    
    // console.log(inputBox, inputBox.value, username);
console.log(username);
    const response = await fetch(`https://api.github.com/users/${username}`);
    if(response.status === 404) {
        alert('user not found')
        loadUserData('github');
        return;
    }

    const details = await response.json();
    console.log(await details);
    displayUserDetails(await details);
}

//showing github's profile data as default
document.addEventListener('DOMContentLoaded', function(){
    
    loadUserData("octocat");

    const inputBox = document.querySelector('.search-container > input.search-box');
    inputBox.addEventListener('change', () => {
        loadUserData(inputBox.value);
    });

    const searchButton = document.querySelector('.search-container > button.search-button');
    searchButton.addEventListener('click', () => {
        loadUserData(inputBox.value);
    });

    console.log(inputBox, searchButton);
});

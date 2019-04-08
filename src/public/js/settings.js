const profile = document.getElementById("profile");
const account = document.getElementById("account");
const profileLink = document.getElementById("profileLink");
const accountLink = document.getElementById("accountLink");
let active = "profile";
let hash = window.location.hash.substr(1);

function changeTabs(id) {
    if (id === active) return;
    active = id;
    profile.classList.toggle("d-none");
    account.classList.toggle("d-none");
    profileLink.classList.toggle("active");
    accountLink.classList.toggle("active");
}

if (hash) changeTabs(hash);
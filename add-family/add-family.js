import { 
    checkAuth,
    logout,
    addFamily 
} from '../fetch-utils.js';

const form = document.querySelector('.family-form');
const logoutButton = document.getElementById('logout');

form.addEventListener('submit', async(e) => {
    // prevent default
    e.preventDefault();

    // get the name and family id from the form
    const data = new FormData(form);
    const familyName = data.get('family-name');

    // use addFamily to create a family with this name
    await addFamily(familyName);

    form.reset();

    location.replace('../create');
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});

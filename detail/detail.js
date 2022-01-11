import { 
    deleteBunny,
    updateBunny,
    getBunny,
    getFamilies, 
    checkAuth, 
    logout 
} from '../fetch-utils.js';

const form = document.querySelector('.bunny-form');
const logoutButton = document.getElementById('logout');
const familyDropdownEl = document.querySelector('select');
const bunnyNameDisplay = document.querySelector('#bunny-name-display');
const familyNameDisplay = document.querySelector('#family-name-display');
const bunnyDeleteButton = document.querySelector('#bunny-delete-button');

//     - use URLSearchParams to grab the ID of the bunny object from the URL. hint: new URLSearchParams(window.location.search), then use .get('id')
const params = new URLSearchParams(window.location.search);
const bunnyId = params.get('id');

form.addEventListener('submit', async(e) => {
    // prevent default
    e.preventDefault();

    // get the name and family id from the form
    const data = new FormData(form);
    const bunnyName = data.get('bunny-name');
    const familyId = data.get('family-id');

    // use updateBunny to update a bunny with this name and family id
    await updateBunny(bunnyName, familyId, bunnyId);

    form.reset();

    //reloads the current page
    location.reload();
});

window.addEventListener('load', async() => {
    // need to get the bunnys name and current family matching the ID from the URL - need to make a getBunny function
    const currentBunny = await getBunny(bunnyId);

    // set the text content of the name span to the bunny object name prop
    bunnyNameDisplay.textContent = currentBunny.name;

    // object returns only family id, not name, so must query the famlies table, and match the id with if statement?



    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    // const familyDropdownEl = document.querySelector('select');
    // DOES THIS HAVE TO BE IN THE EVENT LISTENER? OR CAN WE GRAB THE DOM ELEMENT IN GLOBAL SCOPE?

    // go get the families from supabase
    const families = await getFamilies();

    // for each family
    for (let family of families) {
        // create an option tag
        const familyNameOption = document.createElement('option');
        
        // set the option's value and text content
        familyNameOption.textContent = family.name;
        familyNameOption.value = family.id;
        
        // and append the option to the select
        familyDropdownEl.append(familyNameOption);

        // code to fill in family name matching family id of current bunny
        if (currentBunny.family_id === family.id) {
            familyNameDisplay.textContent = family.name;
        }
    }
});

bunnyDeleteButton.addEventListener('click', async() => {
    await deleteBunny(bunnyId);

    location.replace('../families');
});


checkAuth();

logoutButton.addEventListener('click', () => {
    logout();
});

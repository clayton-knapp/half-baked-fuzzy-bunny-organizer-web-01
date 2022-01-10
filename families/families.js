import { 
    checkAuth, 
    deleteBunny, 
    getFamilies, 
    logout,
} from '../fetch-utils.js';

checkAuth();

const familiesEl = document.querySelector('.families-container');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayFamilies() {
    // fetch families from supabase
    const families = await getFamilies();
    console.log(families);
    // clear out the familiesEl
    familiesEl.textContent = '';

    for (let family of families) {
        // create three elements for each family, one for the whole family, one to hold the name, and one to hold the bunnies
        const outerFamilyDiv = document.createElement('div');
        const familyNameEl = document.createElement('p');
        const bunniesDiv = document.createElement('div');
        
        // add the bunnies css class to the bunnies el, and family css class to the family el
        outerFamilyDiv.classList.add('family');
        bunniesDiv.classList.add('bunnies');

        // put the family name in the name element
        familyNameEl.textContent = family.name;

        // for each of this family's bunnies
        for (let bunny of family.fuzzy_bunnies) {
            // make an element with the css class 'bunny', and put the bunny's name in the text content
            const bunnyEl = document.createElement('p');
            bunnyEl.classList.add('bunny');
            bunnyEl.textContent = bunny.name; // ????????? 
            
            // add an event listener to the bunny el. On click, delete the bunny, then refetch and redisplay all families.
    
    
            // append this bunnyEl to the bunniesEl
            bunniesDiv.append(bunnyEl);

        }


        // append the bunniesEl and nameEl to the familyEl
        outerFamilyDiv.append(familyNameEl, bunniesDiv);

        // append the familyEl to the familiesEl
        familiesEl.append(outerFamilyDiv);
    }


}

window.addEventListener('load', async() => {
    // const families = await getFamilies();

    // displayFamilies(families);
    displayFamilies();
});
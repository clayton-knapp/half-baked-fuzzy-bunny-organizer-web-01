export function renderBunny(bunny) {
    const bunnyEl = document.createElement('p');
    bunnyEl.classList.add('bunny');
    bunnyEl.textContent = bunny.name;


    //STRETCH DETAIL PAGE STUFF
    const anchorEl = document.createElement('a');
    anchorEl.href = `../detail/?id=${bunny.id}`;

    anchorEl.append(bunnyEl);

    return anchorEl;
}
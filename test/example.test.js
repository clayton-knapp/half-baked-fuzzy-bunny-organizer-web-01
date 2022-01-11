// IMPORT MODULES under test here:
// import { example } from '../example.js';
import { renderBunny } from '../families/render-utils.js';

const test = QUnit.test;

test('test renderBunny function to see if it returns expected DOM element', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = '<a href="../detail/?id=160"><p class="bunny">JoJo2</p></a>';

    
    //Act 
    // Call the function you're testing and set the result to a const
    const bunny = {
        name: 'JoJo2',
        id: 160
    };
    const actual = renderBunny(bunny);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected, 'takes in name "JoJo" and id "160" and outputs "<a href="../detail/?id=160"><p class="bunny">JoJo2</p></a>"');
});

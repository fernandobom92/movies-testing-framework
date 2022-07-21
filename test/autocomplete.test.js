const waitFor = (selector) => {
    return new Promise( (resolve, reject) =>{
        const interval = setInterval(() => {
            if(document.querySelector(selector)) {
                clearInterval(interval);
                clearTimeout(timeout);
                resolve();
            }
        }, 30);

        const timeout = setTimeout(() => {
            clearInterval(interval);
            reject();
        }, 2000);
    });
};

beforeEach(() => {
    //qualquer codigo colocado aqui sera aplicado dentro de cada função it abaixo
    document.querySelector('#target').innerHTML = '';
    createAutoComplete({
        root: document.querySelector('#target'),
        fetchData() {
            return [
                { Title: 'Avengers' },
                { Title: 'Avengers 2' },
                { Title: 'Avengers 3' }
            ];
        },
        renderOption(movie) {
            return movie.Title; // Title com T maiusculo vem da API
        }
    });
});

it('dropdown começa fechado', async () => {
    const dropdown = document.querySelector('.dropdown');
    expect(dropdown.className).not.to.include('is-active');
});

it('abrir o dropdown após a busca', async () => {
    const input = document.querySelector('input');
    input.value = 'avengers';
    input.dispatchEvent( new Event('input') );

    await waitFor('.dropdown-item');

    const dropdown = document.querySelector('.dropdown');

    expect(dropdown.className).to.include('is-active');
});

it('apos a busca, mostra alguns resultados', async () =>{
    const input = document.querySelector('input');
    input.value = 'avengers';
    input.dispatchEvent( new Event('input') );

    await waitFor('.dropdown-item');

    const items = document.querySelectorAll('.dropdown-item');

    expect(items.length).to.equal(3);
});
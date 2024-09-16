$(document).ready(async function() {
    const apiUrl = 'https://narutodb.xyz/api/clan';
    const clansToShow = ['hatake', 'aburame', 'funato', 'hyuga', 'akimichi', 'chinoike'];

    async function fetchClans() {
        try {
            const response = await $.getJSON(apiUrl);
            return response.clans.filter(clan => clansToShow.includes(clan.name.toLowerCase())) || [];
        } catch (error) {
            console.log("Error al obtener los clanes:", error);
            return [];
        }
    }

    async function fetchClanCharacters(clanId) {
        try {
            const response = await $.getJSON(`${apiUrl}/${clanId}`);
            return response.characters || [];
        } catch (error) {
            console.log("Error al obtener los personajes del clan:", error);
            return [];
        }
    }

    function renderCharacter(character) {
        let div = $("<div></div>").addClass("personaje");
        let img = $("<img />").attr("src", character.images.length > 0 ? character.images[0] : "./assets/img/not-found.jpg");
        let name = $("<h2></h2>").text(character.name).addClass("personaje-nombre");
        let clan = $("<p></p>").text(character.personal ? character.personal.sex : 'Desconocido').addClass("personaje-clan");
        let debut = $("<p></p>").text(`Debut: ${character.debut ? character.debut.anime : 'Desconocido'}`).addClass("personaje-datos");
        let jutsu = $("<p></p>").text(`Jutsu: ${character.jutsu ? character.jutsu.join(', ') : 'Desconocido'}`).addClass("personaje-datos");

        div.append(
            $("<div></div>").addClass("personaje-imagen").append(img),
            $("<div></div>").addClass("personaje-info").append(
                $("<div></div>").addClass("nombre-container").append(name),
                $("<div></div>").addClass("personaje-clan").append(clan),
                $("<div></div>").addClass("personaje-datos").append(debut, jutsu)
            )
        );

        $("#listaClanes").append(div);
    }

    function updateCharacterList(characters, error = '') {
        const listaClanes = $('#listaClanes');
        listaClanes.empty();

        if (error) {
            listaClanes.append(`<p>${error}</p>`);
        } else if (characters.length === 0) {
            listaClanes.append('<p>No se encontraron personajes.</p>');
        } else {
            characters.forEach(renderCharacter);
        }
    }

    async function populateClanButtons(clans) {
        const navList = $('.nav-list');
        navList.empty();
        navList.append('<li><button id="btnVerTodos">Ver todos</button></li>');

        clans.forEach(clan => {
            navList.append(`
                <li class="clanes">
                    <button class="btn-clan" data-clan="${clan.id}">${clan.name}</button>
                </li>
            `);
        });

        $('#btnVerTodos').on('click', async function() {
            let allCharacters = [];
            let fetchCount = 0;

            for (const clan of clans) {
                try {
                    const characters = await fetchClanCharacters(clan.id);
                    if (characters.length > 0) {
                        allCharacters = allCharacters.concat(characters);
                    }
                } catch {
                    // Manejo de errores, no hacemos nada adicional aquí.
                }
                fetchCount++;
                if (fetchCount === clans.length) {
                    updateCharacterList(allCharacters, allCharacters.length === 0 ? 'No se encontraron personajes.' : '');
                }
            }
        });

        $('.btn-clan').on('click', async function() {
            const clanId = $(this).data('clan');
            try {
                const characters = await fetchClanCharacters(clanId);
                updateCharacterList(characters, characters.length === 0 ? 'No se encontraron personajes para este clan.' : '');
            } catch {
                updateCharacterList([], 'Error al obtener los datos del clan.');
            }
        });
    }

    async function showAllCharactersOnLoad(clans) {
        let allCharacters = [];
        let fetchCount = 0;

        for (const clan of clans) {
            try {
                const characters = await fetchClanCharacters(clan.id);
                if (characters.length > 0) {
                    allCharacters = allCharacters.concat(characters);
                }
            } catch {
                // Manejo de errores, no hacemos nada adicional aquí.
            }
            fetchCount++;
            if (fetchCount === clans.length) {
                updateCharacterList(allCharacters, allCharacters.length === 0 ? 'No se encontraron personajes.' : '');
            }
        }
    }

    try {
        const clans = await fetchClans();
        if (clans.length > 0) {
            populateClanButtons(clans);
            await showAllCharactersOnLoad(clans);
        } else {
            $('#listaClanes').append('<p>Error al obtener la lista de clanes.</p>');
        }
    } catch {
        $('#listaClanes').append('<p>Error al obtener la lista de clanes.</p>');
    }
});

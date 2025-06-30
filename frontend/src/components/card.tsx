

interface CardProps{
    expantion: string,
    name: string,
    mana: number,
    attack: number,
    health: number;
}

function Card({expantion, name, mana, attack, health}: CardProps){
    
    const sideDashesAmount = Math.floor((22 - name.length)/2);

    const emptyArray = new Array(sideDashesAmount);
    let sideNameDashes = emptyArray.join('-');

    return(
        
        <div className=" font-mono w-50 leading-5">
            <a className="float-left">╔═══╦═════════════<span className="-ml-0.5">╦═══╗</span>
            </a><br/>
            <p className="text-left">║ {expantion} ║ 
                <span className="float-end">
                    ║{mana.toString().length < 2 ? ' ': ''}{mana} ║
                </span>
            </p>
            <p className="text-left">╠═══╝
                <span className="float-end">╚═══╣</span>
            </p>
            <p className="text-left">║
                <span className="float-end">║</span>
            </p>
            <p className="text-left">║
                <span className="float-end">║</span>
            </p>
            <p className="text-left">║
                <span className="float-end">║</span>
            </p>
            <p className="text-left">║
                <span className="float-end">║</span>
            </p>

            {/*
            Estamos usando una tipografía monoespacio, lo que significa que cada caracte ocupa el mismo espacio horizontalmente.
            Así que, para poder centrar el nombre de la carta de manera programática, el algoritmo debe ser
                1. Obtener el número máximo de caractéres que caben en la carta, de un lado al otro. Esto se puede hacer
                de cualquier manera, incluso contándolos a mano.
                2. Resta la cantidad de caracteres en el nombre de la carta, a la cantidad del paso anterior. Esto resulta
                en la cantidad de caracteres sobrantes.
                3. Divide el número resultante entre dos, esto equivale a la cantidad de guiones a cada lado del nombre.

            */}

            <p>
                <span className="float-left">║</span>
                <span>
                    {sideNameDashes + name + sideNameDashes}
                </span>
                <span className="float-end">║</span>
            </p>
            <p className="text-left">╠═══╗
                <span className="float-end">╔═══╣</span>
            </p>
            <p className="text-left">
                ║ {attack}{attack.toString().length < 2 ? ' ': ''}║
                <span className="float-end">
                    ║{health.toString().length < 2 ? ' ': ''}{health} ║
                </span>
            </p>
            <a>╚═══╩═════════════<span className="-ml-0.5">╩═══╝</span></a>
        </div>
    );
}

export default Card;
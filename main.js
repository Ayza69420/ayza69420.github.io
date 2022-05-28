document.getElementById("button").addEventListener("click",() => {
    let t_d = [];
    let d = [];
    let classifying = {"male": {}, "female": {}};
    let answers = document.getElementById("input").value.split("\n");
    let output = [];

    for (let i=0; i<answers.length; i++) {
        const answer = answers[i].split(" ");
        
        if (answer.length == 3) { t_d.push([parseInt(answer[0]), answer[1].toLowerCase(), answer[2]]) }
        else if (answer.length == 2) { d.push([parseInt(answer[0]), answer[1].toLowerCase()]) }
    }

    for (let i=0; i<t_d.length; i++) {
        let [_, gender, genre] = t_d[i];   
        let ages = [];

        if (!(genre in classifying[gender])) {
            for (let k=0; k<t_d.length; k++) {
                let [k_age, k_gender, k_genre] = t_d[k]
                
                if ((k_gender == gender) && (k_genre == genre)) {
                    ages.push(k_age);
                }
            }
            let range = [];

            for (let ran=Math.min(...ages); ran<Math.max(...ages)+1; ran++) { range.push(ran) }
            classifying[gender][genre] = range
        }
    }

    for (let i=0; i<d.length; i++) {
        let [age, gender] = d[i];
        let possibilities = [];

        for (let item in classifying[gender]) {
            if (classifying[gender][item].includes(age)) {
                possibilities.push(item);
            }
        }

        for (let i=1; i<possibilities.length; i++) {
            let x = possibilities[i-1];
            let y = possibilities[i];    
            let min_x = classifying[gender][x][0];
            let min_y = classifying[gender][y][0];
            let differences = [age-min_x, age-min_y];
            
            if (differences[0] != differences[1]) {
                let maximum = Math.max(...differences)

                if (maximum == differences[0]) {
                    possibilities.splice(possibilities.indexOf(x), 1)
                }

                else {
                    possibilities.splice(possibilities.indexOf(y), 1)
                }
            }

            else {
                occurrences_x = 0;
                occurrences_y = 0;
 
                for (let k=0; k<t_d.length; k++) {
                    if (t_d[k][2] == x) {
                        occurrences_x++
                    }

                    else if (t_d[k][2] == y) {
                        occurrences_y++
                    }
                }
                let minimum = Math.min(...[occurrences_x, occurrences_y]);
                
                if (minimum==occurrences_x) {
                    possibilities.splice(possibilities.indexOf(x), 1)
                }
                
                else {
                    possibilities.splice(possibilities.indexOf(y), 1)
                }

            }
        }

        output.push(age + " " + gender + " " + ":" + " " + possibilities.join("/"));
    }

    document.getElementById("output").innerHTML = output.join("\n");
})

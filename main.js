document.getElementById("button").addEventListener("click",() => {
    var t_d = [];
    var d = [];
    var occurrences = {"male": {}, "female": {}};
    var classifying = {"male": {}, "female": {}};
    var genres = new Set();
    var output = [];
 
    const answers = document.getElementById("input").value.split("\n");

    for (let i=0; i<answers.length; i++) {
        const answer = answers[i].split(" ");
        
        if (answer.length == 3) { 
            occurrences[answer[1].toLowerCase()][answer[2]] = (() => {
               if (answer[2] in occurrences) return answer[2] + 1 
                else return 1
            })()
            genres.add(answer[2])

            t_d.push([parseInt(answer[0]), answer[1].toLowerCase(), answer[2]]) 
        }
        else if (answer.length == 2) { d.push([parseInt(answer[0]), answer[1].toLowerCase()]) }
    }
    
    for (const genre of genres) {
        for (const gender of ["male", "female"]) {
            ages = [];

            for (const person of t_d) {
                if (person[1] == gender && person[2] == genre) {
                    ages.unshift(person[0]);
                }
            }

            if (ages.length > 0) classifying[gender][genre] = [Math.min(...ages), Math.max(...ages)]; 
        }
    }
    
    for (const person of d) {
        var [age, gender] = person;
        var possibilities = []
        
        for (genre in classifying[gender]) {
            let min_age = classifying[gender][genre][0];
            let max_age = classifying[gender][genre][1];
                
            if (age <= max_age && age >= min_age) possibilities.unshift(genre);
        }

        for (const k of possibilities.slice(1)) {
            const [min_a, min_b, max_a, max_b] = [
                classifying[gender][possibilities[0]][0],
                classifying[gender][possibilities[0]][1],
                classifying[gender][k][0],
                classifying[gender][k][1],
            ]

            const [diff_a, diff_b, diff_c, diff_d] = [Math.abs(age-min_a), Math.abs(age-min_b), Math.abs(age-max_a), Math.abs(age-max_b)]
            const occ_a = occurrences[gender][possibilities[0]]
            const occ_b = occurrences[gender][k]

            if (!(diff_a == diff_b)) {
                possibilities.splice(possibilities.indexOf([possibilities[0], k][Math.max(...[max_a, max_b])==max_b], 1))
            }
    
            else if (!(occ_a == occ_b)) {
                possibilities.splice([possibilities[0],k][Math.min(...[occ_a, occ_b])==occ_b])
            }

            else {
                possibilities.splice([possibilities[0], k][Math.max(...[max_c, max_d])==max_c],1)
            }
        }

        output.push(age + " " + gender + " " + ":" + " " + possibilities.join("/"));
    }
    
    document.getElementById("output").innerHTML = output.join("\n");
})

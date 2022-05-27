document.getElementById("button").addEventListener("click",() => {
    let t_d = [];
    let d = [];
    let classifying = {"male": {}, "female": {}};
    let answers = document.getElementById("input").value.split("\n");
    let output = [];

    for (let i=0; i<answers.length; i++) {
        const answer = answers[i].split(" ");
        
        if (answer.length == 3) { t_d.push([parseInt(answer[0]), answer[1], answer[2]]) }
        else { d.push([parseInt(answer[0]), answer[1]]) }
    }

    for (let i=0; i<t_d.length; i++) {
        let [age, gender, genre] = t_d[i];   
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

        if (possibilities) {
            output.push(age + " " + gender + " " + ":" + " " + possibilities.join("/"));
        }
        else {
            output.push(age + " " + gender + " " + ":" + " " + "None");
        }
    }

    document.getElementById("output").innerHTML = output.join("\n");
})
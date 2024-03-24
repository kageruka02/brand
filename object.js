function organizeIdentities(identitiesArray) {
    const organizedData = { women: {}, men: {} };

    for (let i = 0; i < identitiesArray.length; i++) {
        const identity = identitiesArray[i];
        const [fullName, age, gender] = identity.split(',').map(item => item.trim());
        const [firstName, lastName] = fullName.split(' ');

        const personInfo = {
            'last-name': lastName,
            'age': parseInt(age)
        };

        if (gender.toLowerCase() === 'female') {
            organizedData.women[firstName] = personInfo;
        } else if (gender.toLowerCase() === 'male') {
            organizedData.men[firstName] = personInfo;
        }
    }

    return organizedData;
}

const formattedIdentities = [
    "Patrick wyne, 30, male",
    "lil wyne, 32, male",
    "Eric mimi, 21, female",
    "Dodos deck, 21, male",
    "Alian Dwine, 22, male",
    "Patrick wyne, 33, male",
    "Patrick wyne, 10, male",
    "Patrick wyne, 40, male"
];

const organizedIdentities = organizeIdentities(formattedIdentities);
console.log(organizedIdentities);

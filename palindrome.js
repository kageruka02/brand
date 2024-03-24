function checkforpalindrome(word)
{
    if (typeof(word) !== 'string')
    return false;
return word.split('').reverse().join('') == word;

}
console.log(checkforpalindrome('32123'))
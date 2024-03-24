function prime(e)
{
    if (e ===1 || e ===2)
    return true;
    if (e <= 0)
    return false;
    for (let i = 2; i <= (e/2+1); i++)
    {
        if (e % i === 0)
        {
            return false;
        }
    }
    return true;
}
function arraychecking(f)
{
    let v = [];
    console.log(f)
    for(let i = 0; i < f.length; i++)
    {
        if (prime(f[i]))
        v.push(f[i]);
    }
    return v;
}
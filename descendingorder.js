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
function descend(f)
{
    let h = [];
    for (let i =0; i < f.length;i ++)
    {
        if (!prime(f[i]))
        h.push(f[i])
    }
    console.log(h)
   for( let i=0; i < h.length; i++)
    {
        for ( let y = i+1; y< h.length; y++ )
        {
            if (h[y] > h[i])
            {
                let inter = h[i];
                h[i] = h[y];
                h[y] = inter;
            }
        }
    }
    return h;
}
console.log(descend([12,9,13,0,50,-200]));

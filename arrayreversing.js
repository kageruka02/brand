function reversearray(f)
{
    for (let i= 0; i < f.length/2; i ++ )
    {
        let  v = 0;
        v = f[i];
        f[i] = f[f.length-1-i];
        f[f.length-1-i] =  v;
    }
    console.log(f);
}

reversearray([10,23,15,17]);

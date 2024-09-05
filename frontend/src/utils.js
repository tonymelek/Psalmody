export const scrollToTop = () => window.scroll({
    behavior: 'smooth',
    left: 0,
    top: 0
})

export const getPreselectedHymnIndex = (hymns, queryHymn) => {
    const index = hymns.findIndex(hymn => {
        const regex = new RegExp(queryHymn, 'i');
        const hymnName = hymn.name.replace(/(\s+|-)/g, '_');
        return regex.test(hymnName)
    })
    return index === -1 ? 0 : index;
}

export const covertToSenctenceCase=camelCase=>{
    const res=camelCase.replace(/[A-Z]/g,l=>` ${l.toUpperCase()}`);
    return res.charAt(0).toUpperCase()+res.slice(1);
}
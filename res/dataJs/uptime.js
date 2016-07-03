function changedatetime(date)
{
    var datetime=new Date(date);

    var year=datetime.getFullYear();
    var month=datetime.getMonth()+1;
    if(month<10)
        month="0"+month;
    var riqi=datetime.getDate();
    if(riqi<10)
        riqi="0"+riqi;
    var xs=datetime.getHours();
    if(xs<10)
        xs="0"+xs;
    var fz=datetime.getMinutes();
    if(fz<10)
        fz="0"+fz;
    var miao=datetime.getSeconds();
    if(miao<10)
        miao="0"+miao;
    return year+"年"+month+"月"+riqi+"日 "+xs+":"+fz;
}
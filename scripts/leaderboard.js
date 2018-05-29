function addLeaderboard(name, score, callback) {
    if (name.length>128 || name.length===0){
        errorCallback("Name length invalid");
    }else if (!Number.isInteger(score)){
        errorCallback("NaN");
    }else if (score<200){
        errorCallback("low score");
    }
    $.ajax({
        type:"POST",
        url:"http://www.seansun.org/towerdefense/addscore",
        dataType: "json",
        data:"name="+name+"&score="+score//"start=0&end=100"
    })
        .done((data)=>{
            console.log('POST response:', data);
            callback(data.data);
        })
        .fail((jqXHR,textStatus,err)=>{
            console.log("Error:",jqXHR,textStatus,err);
            errorCallback(err);
        });
}

function getLeaderboard(start, end, callback,errorCallback) {
    if (!Number.isInteger(start)||!Number.isInteger(end)){
        errorCallback("NaN");
        return;
    }else if (start<1 || end<0){
        errorCallback("Invalid arguments");
    }
    $.ajax({
        type:"POST",
        url:"http://www.seansun.org/towerdefense/leaderboard",
        dataType: "json",
        data:"start="+start+"&end="+end//"start=0&end=100"
    })
        .done((data)=>{
            console.log('POST response:', data);
            console.log('Table:', data.table);
            callback(data.table);
        })
        .fail((jqXHR,textStatus,err)=>{
            console.log("Error:",jqXHR,textStatus,err);
            errorCallback(err);
        });
}
let leaderboard = {
    playerName: "Player" + Math.floor(Math.random() * 10000),
    myRanking: "You: ",
    leaderboard: [],
    dispReady: false,
    startIdx: 1,
    dispSize: 5,
    init: () => {
        leaderboard.dispReady = false;
        leaderboard.myRanking = "You:";
        leaderboard.playerName = "Player" + Math.floor(Math.random() * 10000);
        leaderboard.leaderboard = [];
        leaderboard.startIdx = 1;
        leaderboard.dispSize = 5;
        console.log("previous leaderboard data cleared");
    },
    addLeaderboard: () => {
        return new Promise((resolve, reject) => {
            leaderboard.addLeaderboardPromiseAgent().then(res => {
                if (res.success === false) {
                    console.log("Error when submitting to leaderboard:", res.message);
                    reject("There was an error submitting your score. Please try again or contact support.");
                } else {
                    console.log("Success when submitting to leaderboard:", res.success, res.message, res);
                    leaderboard.myRanking = "You: (" + res.data.ranking + ")";
                    resolve(true);
                }
            });
        });
    },
    addLeaderboardPromiseAgent: () => {
        return new Promise(resolve => {
            try {
                leaderboard.rawAddLeaderboard(leaderboard.playerName, Game.score, (res) => {
                    resolve(res);
                });
            } catch (err) {
                resolve({
                    success: false,
                    message: err
                });
            }
        });
    },
    rawAddLeaderboard: (name, score, callback) => {
        if (name.length > 20 || name.length === 0) {
            callback({
                message: "Name length invalid",
                success: false
            });
            return;
        } else if (!Number.isInteger(score)) {
            callback({
                message: "NaN",
                success: false
            });
            return;
        } else if (score < 200) {
            callback({
                message: "low score",
                success: false
            });
            return;
        }
        $.ajax({
            type: "POST",
            url: "/towerdefense/addscore",
            dataType: "json",
            data: "name=" + name + "&score=" + score //"start=0&end=100"
        }).done((data) => {
            console.log('POST response:', data);
            callback({
                message: "success",
                data: data,
                success: true
            });
        }).fail((jqXHR, textStatus, err) => {
            console.log("Error:", jqXHR, textStatus, err);
            callback({
                message: err,
                success: false
            });
        });
    },
    getLeaderboard: async (notForLeaderboardPAGE = false) => {
        console.log("starting getleaderboard");
        let res;
        while (true) {
            res = await leaderboard.getLeaderboardPromiseAgent(leaderboard.startIdx, leaderboard.startIdx + leaderboard.dispSize - 1);
            if (res.success) {
                break;
            }
            if (confirm("Failed to get Leaderboard, try again?") === false) {
                leaderboard.leaderboard.unshift({
                    name: "Name",
                    ranking: "Ranking",
                    score: "Score"
                });
                if (notForLeaderboardPAGE) leaderboard.leaderboard.push({
                    name: leaderboard.playerName,
                    score: Game.score,
                    ranking: leaderboard.myRanking
                });
                leaderboard.dispReady = true;
                return;
            }
        }
        leaderboard.leaderboard = res.json;
        leaderboard.leaderboard.unshift({
            name: "Name",
            ranking: "Ranking",
            score: "Score"
        });
        if (notForLeaderboardPAGE) leaderboard.leaderboard.push({
            name: leaderboard.playerName,
            score: Game.score,
            ranking: leaderboard.myRanking
        });
        console.log(res);
        leaderboard.dispReady = true;
    },
    getLeaderboardPromiseAgent: (start, end) => {
        return new Promise(resolve => {
            console.log("starting getleaderboard agent");
            try {
                leaderboard.rawGetLeaderboard(start, end, (res) => {
                    resolve(res);
                });
            } catch (err) {
                resolve({
                    success: false,
                    message: err
                });
            }
        });
    },
    rawGetLeaderboard: (start, end, callback) => {
        if (!Number.isInteger(start) || !Number.isInteger(end)) {
            callback({
                message: "NaN",
                success: false
            });
            return;
        } else if (start < 1 || end < 0) {
            callback({
                message: "Invalid arguments",
                success: false
            });
        }
        $.ajax({
            type: "POST",
            url: "/towerdefense/leaderboard",
            dataType: "json",
            data: "start=" + start + "&end=" + end //"start=0&end=100"
        }).done((data) => {
            console.log('POST response:', data);
            console.log('Table:', data.table);
            console.log('Json:', data.json);
            console.log(data);
            callback({
                message: "success",
                success: true,
                table: data.table,
                json: data.json
            });
        }).fail((jqXHR, textStatus, err) => {
            console.log("Error:", jqXHR, textStatus, err);
            callback({
                message: err,
                success: false,
                status: textStatus,
                response: jqXHR
            });
        });
    }
};
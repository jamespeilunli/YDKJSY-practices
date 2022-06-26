const dayStart = "07:30";
const dayEnd = "17:45";

const dayStartMin = 60 * Number(dayStart.split(":")[0]) + Number(dayStart.split(":")[1]); // should i remove the first Number?
const dayEndMin = 60 * Number(dayEnd.split(":")[0]) + Number(dayEnd.split(":")[1]);

function scheduleMeeting(startTime,durationMin) {
    let startMin = 60 * Number(startTime.split(":")[0]) + Number(startTime.split(":")[1]);
    let endMin = startMin + durationMin;
    
    return dayStartMin <= startMin && endMin <= dayEndMin
}

console.log(
    scheduleMeeting("7:00",15),     // false
    scheduleMeeting("07:15",30),    // false
    scheduleMeeting("7:30",30),     // true
    scheduleMeeting("11:30",60),    // true
    scheduleMeeting("17:00",45),    // true
    scheduleMeeting("17:30",30),    // false
    scheduleMeeting("18:00",15)     // false
)
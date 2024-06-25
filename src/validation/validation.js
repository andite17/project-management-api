const validationRequestTask = ({ startTime, endTime }) => {
    if(new Date(startTime) > new Date(endTime)) {
        throw new Error("startTime must be lower than endTime")
    } 
}

const validationTimeOverlaps = (project, data) => {
    // console.log(data)
    const newStartTime = new Date(data.startTime);
    const newEndTime = new Date(data.endTime);

    // validation time overlapping
    const isOverlapping = project.tasks.some(taskField => {
            return (
                (newStartTime >= taskField.startTime && newStartTime < taskField.endTime) ||
                (newEndTime > taskField.startTime && newEndTime <= taskField.endTime) ||
                (newStartTime <= taskField.startTime && newEndTime >= taskField.endTime)
            );
    });

    if (isOverlapping) {
        throw new Error('Task time overlaps with an existing task in the project');
    }
}

module.exports = {
    validationRequestTask,
    validationTimeOverlaps
}
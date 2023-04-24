enum status {
    Done = 2,
    Scheduled = 1,
    Waiting = 0
}

interface Appointment {
    name: string,
    time: string,
    location: string
    status: status,
    checked: boolean
}

export default Appointment;
interface Report {
    noOfCheckedRecords: number;
    noOfUncheckedRecords: number;
    noOfCheckIns: number,
    noOfPatients: number,
    noOfNewRegisters: number,
    noOfMalePatients: number,
    noOfFemalePatients: number,
    noOfRecordsPerMonth: Record<string, number>
}

export default Report;
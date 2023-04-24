
interface MedicalRecord {
    recordId:number;
    pulseRate: number;
    diaMmHg: number;
    sysMmHg: string;
    checked: boolean;
    dateCreated: string;
    timeCreated: string;
    notes: string;
  }

export default MedicalRecord;
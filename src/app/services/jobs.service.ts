import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  constructor(private angularFirestore: AngularFirestore) {}
  getJobs() {
    return this.angularFirestore.collection('job').snapshotChanges();
  }
  getJobsHired() {
    return this.angularFirestore
      .collection('job', (ref) => ref.where('status', '==', 'hired'))
      .snapshotChanges();
  }
  getJobsPending() {
    return this.angularFirestore
      .collection('job', (ref) => ref.where('status', '==', 'private'))
      .snapshotChanges();
  }
  getJobsClosed() {
    return this.angularFirestore
      .collection('job', (ref) => ref.where('status', '==', 'closed'))
      .snapshotChanges();
  }
  getJobsPublic() {
    return this.angularFirestore
      .collection('job', (ref) => ref.where('status', '==', 'public'))
      .snapshotChanges();
  }
}

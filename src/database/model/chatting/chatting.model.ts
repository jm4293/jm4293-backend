import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserModel } from '~/database/model';

@Entity({ name: 'chatting', comment: '채팅 테이블' })
export class ChattingModel {
  @PrimaryGeneratedColumn({ name: 'chatting_seq', type: 'bigint', comment: 'chattingSeq' })
  chattingSeq: number;

  @Column({ name: 'user_seq', type: 'bigint', comment: 'userSeq' })
  userSeq: number;

  @Column({ type: 'varchar', length: 500, comment: '채팅 내용' })
  content: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', comment: '생성일' })
  createdAt: Date;

  @ManyToOne(() => UserModel, (user) => user.chattingList)
  @JoinColumn({ name: 'user_seq' })
  user: UserModel;
}

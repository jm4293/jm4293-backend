import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardModel } from '../board';
import { BoardCommentModel } from '../board-comment';

@Entity({ name: 'user', comment: '유저 테이블' })
export class UserModel {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', comment: 'userSeq' })
  id: number;

  @Column({ name: 'name', type: 'text', comment: '유저 이름' })
  name: string;

  @Column({ name: 'email', type: 'text', comment: '유저 이메일' })
  email: string;

  @Column({ name: 'password', type: 'text', comment: '유저 비밀번호' })
  password: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '생성일' })
  createdAt: Date;

  @OneToMany(() => BoardModel, (board) => board.user)
  boards: BoardModel[];

  @OneToMany(() => BoardCommentModel, (comment) => comment.user)
  comments: BoardCommentModel[];
}

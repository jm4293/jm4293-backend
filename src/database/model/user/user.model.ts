import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BoardModel } from '../board';
import { IsEnum } from 'class-validator';
import { AuthStatusEnum } from '~/type/enum/auth';
import { BoardCommentModel, ChattingModel } from '~/database/model';

@Entity({ name: 'user', comment: '유저 테이블' })
export class UserModel {
  @PrimaryGeneratedColumn({ name: 'user_seq', type: 'bigint', comment: 'userSeq' })
  userSeq: number;

  @Column({ name: 'name', type: 'text', comment: '유저 이름' })
  name: string;

  @Column({ name: 'email', type: 'text', comment: '유저 이메일' })
  email: string;

  @Column({ name: 'password', type: 'text', comment: '유저 비밀번호' })
  password: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', comment: '생성일' })
  createdAt: Date;

  @Column({ name: 'updated_at', type: 'timestamp', comment: '수정일' })
  updatedAt: Date;

  @Column({ name: 'status', type: 'varchar', length: 10, comment: '상태' })
  @IsEnum(AuthStatusEnum)
  status: AuthStatusEnum;

  @OneToMany(() => BoardModel, (board) => board.user)
  boardList: BoardModel[];

  @OneToMany(() => BoardCommentModel, (boardComment) => boardComment.user)
  boardCommentList: BoardCommentModel[];

  @OneToMany(() => ChattingModel, (chatting) => chatting.user)
  chattingList: ChattingModel[];
}

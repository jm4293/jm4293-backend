import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from '../user';
import { IsEnum } from 'class-validator';
import { BoardStatusEnum } from '~/type/enum/board';
import { BoardCommentModel } from '~/database/model';

@Entity({ name: 'board', comment: '게시판 테이블' })
export class BoardModel {
  @PrimaryGeneratedColumn({ name: 'board_seq', type: 'bigint', comment: 'boardSeq' })
  boardSeq: number;

  @Column({ name: 'user_seq', type: 'bigint', comment: '작성자' })
  userSeq: number;

  @Column({ name: 'title', type: 'text', comment: '제목' })
  title: string;

  @Column({ name: 'content', type: 'text', comment: '내용' })
  content: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', comment: '생성일' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', comment: '수정일' })
  updatedAt: Date;

  @Column({ name: 'status', type: 'varchar', length: 10, comment: '상태' })
  @IsEnum(BoardStatusEnum)
  status: BoardStatusEnum;

  @OneToMany(() => BoardCommentModel, (comment) => comment.board)
  comments: BoardCommentModel[];

  @ManyToOne(() => UserModel, (user) => user.boardList)
  @JoinColumn({ name: 'user_seq', referencedColumnName: 'userSeq' })
  user: UserModel;
}

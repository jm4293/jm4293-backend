import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserModel } from '../user';
import { BoardModel } from '../board';
import { IsEnum } from 'class-validator';
import { BoardCommentStatusEnum } from '~/type/enum/board-comment';

@Entity({ name: 'board_comment', comment: '게시판 댓글 테이블' })
export class BoardCommentModel {
  @PrimaryGeneratedColumn({ name: 'seq', type: 'bigint', comment: 'boardCommentSeq' })
  seq: number;

  @Column({ name: 'user_seq', type: 'bigint', comment: 'userSeq' })
  user_seq: number;

  @Column({ name: 'board_seq', type: 'bigint', comment: 'boardSeq' })
  board_seq: number;

  @Column({ type: 'varchar', length: 500, comment: '댓글 내용' })
  content: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp', comment: '생성일' })
  createdAt: Date;

  @Column({ name: 'status', type: 'varchar', length: 10, comment: '상태' })
  @IsEnum(BoardCommentStatusEnum)
  status: BoardCommentStatusEnum;

  @ManyToOne(() => UserModel, (user) => user.comments)
  @JoinColumn({ name: 'user_seq' })
  user: UserModel;

  @ManyToOne(() => BoardModel, (board) => board.comments)
  @JoinColumn({ name: 'board_seq' })
  board: BoardModel;
}

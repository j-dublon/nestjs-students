/*
 * Jira Ticket: 
 * Created Date: Thu, 1st Jul 2021, 15:46:01 pm
 * Author: Jodi Dublon
 * Email: jodi.dublon@thedistance.co.uk
 * Copyright (c) 2021 The Distance
 */

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonInput } from 'src/lesson/lesson.input';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>
  ) { }

  async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
    const { firstName, lastName } = createStudentInput;
    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName
    });

    return this.studentRepository.save(student);
  }

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find()
  }

  async getStudentById(id: string): Promise<Student> {
    return this.studentRepository.findOne({id})
  }

  async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        }
      }
    })
  }
}

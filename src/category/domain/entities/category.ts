import { Entity } from "../../../@seedwork/domain/entity";
import { UniqueEntityId } from "../../../@seedwork/domain/unique-entity-id.vo";
import { ValidatorRules } from "./../../../@seedwork/validator/validator-rules";

export type CategoryProperties = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category extends Entity<CategoryProperties> {
  constructor(public readonly props: CategoryProperties, id?: UniqueEntityId) {
    Category.validate({
      name: props.name,
      description: props.description,
      is_active: props.is_active ?? true,
    });
    super(props, id);
    this.description = this.props.description;
    this.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
  }

  static validate({
    name,
    description,
    is_active,
  }: Omit<CategoryProperties, "created_at">) {
    ValidatorRules.values(name, "name").required().string();
    ValidatorRules.values(description, "description").string();
    ValidatorRules.values(is_active, "is_active").boolean();
  }

  update(name: string, description: string): void {
    Category.validate({ name, description, is_active: this.is_active });
    this.name = name;
    this.description = description;
  }

  activate(): void {
    this.props.is_active = true;
  }

  deactivate(): void {
    this.props.is_active = false;
  }

  get name() {
    return this.props.name;
  }

  get description() {
    return this.props.description;
  }

  private set description(value: string | undefined | null) {
    this.props.description = value ?? (null as any);
  }

  get is_active() {
    return this.props.is_active;
  }

  private set is_active(value: boolean | undefined) {
    this.props.is_active = value ?? true;
  }

  get created_at() {
    return this.props.created_at;
  }

  private set name(name: string) {
    this.props.name = name;
  }
}

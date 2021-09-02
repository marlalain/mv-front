export interface Page<T> {
  content: T[];
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

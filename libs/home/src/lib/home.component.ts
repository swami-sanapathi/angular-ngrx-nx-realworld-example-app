import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  articleListInitialState,
  articleListQuery,
  articleListActions,
  ListType,
} from '@realworld/articles/data-access';
import { selectLoggedIn } from '@realworld/auth/data-access';
import { CommonModule } from '@angular/common';
import { TagsListComponent } from './tags-list/tags-list.component';
import { ArticleListComponent } from '@realworld/articles/feature-articles-list/src';
import { HomeStoreService } from './home.store';
import { provideComponentStore } from '@ngrx/component-store';
import { Store } from '@ngrx/store';
import { delay } from 'rxjs';

@Component({
  selector: 'cdt-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, TagsListComponent, ArticleListComponent],
  providers: [provideComponentStore(HomeStoreService)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly homeStore = inject(HomeStoreService);
  private readonly destroyRef = inject(DestroyRef);

  listConfig$ = this.store.select(articleListQuery.selectListConfig);
  tags$ = this.homeStore.tags$;
  isAuthenticated = false;

  ngOnInit() {
    this.store
      .select(selectLoggedIn)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((isLoggedIn) => {
        this.isAuthenticated = isLoggedIn;
        this.getArticles();
      });
  }

  setListTo(type: ListType = 'ALL') {
    this.store.dispatch(articleListActions.setListConfig({ config: { ...articleListInitialState.listConfig, type } }));
  }

  getArticles() {
    if (this.isAuthenticated) {
      this.setListTo('FEED');
    } else {
      this.setListTo('ALL');
    }
  }

  setListTag(tag: string) {
    this.store.dispatch(
      articleListActions.setListConfig({
        config: {
          ...articleListInitialState.listConfig,
          filters: {
            ...articleListInitialState.listConfig.filters,
            tag,
          },
        },
      }),
    );
  }
}
